import React, { useState } from 'react'
import { View, ScrollView, SafeAreaView, Text } from 'react-native'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native'
import { NameScreen } from '../../Constants/nameScreen'
import { Header } from '../../Components/Header'
import { InputField } from '../../Components/TextInputField'
import { validatePhone } from '../../Helper/validate'
import { DobField } from '../../Components/TextInputField/dobField'
import { DropdownField } from '../../Components/TextInputField/dropdownField'
import { ButtonConfirm } from '../../Components/ButtonConfirm'
import { mainStyles as styles } from './styles'

const genderData = [
    { id: true, label: 'Nam' },
    { id: false, label: 'Nữ' },
]

const Register = () => {
    const navigation = useNavigation()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [name, setName] = useState('')
    const [vehicle, setVehicle] = useState('')
    const [dateOfBirthday, setDateOfBirthday] = useState('')
    const [gender, setGender] = useState(null);
    const [date, setDate] = useState(new Date())

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        setDateOfBirthday(currentDate.toLocaleDateString('en-GB'))
    };
    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };
    const onClickDOB = () => {
        showMode('date');
    }
    const data = {
        name: name,
        phone: phoneNumber,
        dob: dateOfBirthday,
        gender: gender,
        vehicle_num: vehicle
    }
    const onClickContinue = () => {
        navigation.navigate(NameScreen.REGISTER_PASSWORD_SCREEN, { data })
    }
    const onClickExit = () => {
        navigation.popToTop()
    }
    const isValidRegisterUser = name.length > 0 && phoneNumber.length > 0 && vehicle.length > 0
        && validatePhone(phoneNumber) === null

    return (
        <SafeAreaView style={styles.component}>
            <Header
                onClickReturn={onClickExit}
                title='Đăng ký'
            />
            <View style={styles.body}>
                <ScrollView>
                    <InputField
                        disable={true}
                        label={'Họ và tên'}
                        value={name}
                        onChangeText={(text) => {
                            const formattedText = text.split(' ')
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ')
                            setName(formattedText)
                        }}
                        validate={true}
                    />
                    <InputField
                        disable={true}
                        label={'Số điện thoại'}
                        value={phoneNumber}
                        onChangeText={text => setPhoneNumber(text)}
                        validate={validatePhone(phoneNumber) === null}
                    />
                    {validatePhone(phoneNumber) !== null &&
                        <Text style={styles.error}>Vui lòng nhập số điện thoại hợp lệ</Text>
                    }
                    <DobField
                        dob={dateOfBirthday}
                        onClickCalendar={onClickDOB}
                    />
                    <DropdownField
                        data={genderData}
                        labelField={"label"}
                        valueField={"id"}
                        placeholder={'Giới tính'}
                        onChange={item => setGender(item.id)}
                        value={gender}
                    />
                    <InputField
                        disable={true}
                        label={'Số xe'}
                        value={vehicle}
                        onChangeText={text => setVehicle(text)}
                        validate={true}
                    />
                </ScrollView>
            </View>
            <ButtonConfirm
                footerStyle={styles.footer}
                onPress={onClickContinue}
                title={'Tiếp tục'}
                validate={isValidRegisterUser}
            />
        </SafeAreaView>
    )
}

export default Register


