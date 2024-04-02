import React, { useContext, useEffect, useState } from 'react';
import { View, SafeAreaView, Text, ScrollView, Linking } from 'react-native';
// import SysModal from '../../sysModal/sys_modal';
import NotificationModal from '../../Components/notificationModal';
import { styles } from './styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../Context';
import { Header } from '../../Components/Header';
import { OrderTransport } from '../../Components/orderTransport';
import { InfoOrder } from '../../Components/addressOrder';
import { DisplayDistance } from '../../Components/displayDistance';
import { OrderSize } from '../../Components/orderSize';
import { ButtonConfirm } from '../../Components/ButtonConfirm';
import { NameScreen } from '../../Constants/nameScreen';
import { instance } from '../../Api/instance';
import LoadingModal from '../../Components/LoadingModal';

const OrderInfo = ({ route, navigation }) => {
    const item = route.params?.item;
    const visibleButton = route.param;
    const { status, setStatus, setSelectedID, isTake, setTake, socket } =
        useContext(AppContext);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [vehicleID, setVehicle] = useState('');
    const [name, setName] = useState('');
    const [dob, setDOB] = useState('');
    const [phone, setPhone] = useState('');
    const [id, setID] = useState('');
    const onClickReturn = () => {
        navigation.goBack();
    };
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setName(await AsyncStorage.getItem('name'));
            setPhone(await AsyncStorage.getItem('phone'));
            setDOB(await AsyncStorage.getItem('dob'));
            setVehicle(await AsyncStorage.getItem('vehicle_num'));
            setID(await AsyncStorage.getItem('id'));
        };
        getData();
    }, []);

    const data = {
        order_id: item.id,
        name: name,
        phone: phone,
        dob: dob,
        vehicle: vehicleID,
    };

    const payload = {
        id_Order: item.id,
        driver_id: id,
        status: 0,
    };

    const getOrder = () => {};

    const onClickTakeOrder = async () => {
        // setLoading(true);
        // if (status) {
        //     setLoading(false);
        //     setErrorMessage('Bạn đang có đơn hàng chưa hoàn thành !!!');
        //     setShowModal(true);
        // } else {
        //     await instance
        //         .get('/order/customer', {
        //             params: {
        //                 id: item.id,
        //             },
        //         })
        //         .then(async (res) => {
        //             console.log(res.data.data.rows);
        //             if (res.data.err == 0) {
        //                 if (res.data.data.rows[0].driver_id != 0) {
        //                     setLoading(false);
        //                     setErrorMessage(
        //                         'Đơn hàng đã được tài xế khác nhận vui lòng nhận đơn hàng khác'
        //                     );
        //                     setShowModal(true);
        //                 } else {
        //                     await instance
        //                         .post('/order/driver', payload)
        //                         .then((res) => {
        //                             console.log(res);
        //                         })
        //                         .catch((err) => {
        //                             console.log(err);
        //                         });
        //                     await instance
        //                         .put('/order/customer/update', {
        //                             id: item.id,
        //                             driver_id: id,
        //                         })
        //                         .then((res) => {
        //                             if (res.data.err == 0) {
        //                                 setLoading(false);
        //                                 setStatus(true);
        //                                 setSelectedID(item.id);
        //                                 setTake(true);
        //                                 item.socket_id = data.socket_id;
        //                                 navigation.navigate(
        //                                     NameScreen.TAKE_ORDER_SCREEN,
        //                                     {
        //                                         item,
        //                                     }
        //                                 );
        //                             }
        //                         })
        //                         .catch((err) => {
        //                             console.log(err);
        //                         });
        //                 }
        //             } else {
        //                 console.log('failure');
        //             }
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         });
        // }
        navigation.navigate(NameScreen.TAKE_ORDER_SCREEN, {
            item,
        });
    };

    const onHideModal = () => {
        setShowModal(false);
    };

    const openGoogleMaps = () => {
        const sourceAddress = item.sender_address;
        const destinationAddress = item.receiver_address;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${sourceAddress}&destination=${destinationAddress}`;
        Linking.openURL(url);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LoadingModal visible={loading} />
            <NotificationModal
                onHide={onHideModal}
                Visible={showModal}
                Message={errorMessage}
            />
            <Header onClickReturn={onClickReturn} title="Thông tin đơn hàng" />
            <View style={{ flex: 8, backgroundColor: 'white' }}>
                <ScrollView style={{ marginTop: 5, padding: 10 }}>
                    <OrderTransport
                        infoShipping={item.infor_shipping}
                        timer={item.createdAt}
                        title={'Thời gian đặt đơn'}
                    />
                    <View style={styles.route}>
                        <DisplayDistance
                            onPress={openGoogleMaps}
                            distance={item.distance}
                        />
                        <InfoOrder
                            title="người gửi"
                            iconColor={'red'}
                            iconName={'location-pin'}
                            address={item.sender_address}
                            name={item.sender_name}
                            phone={item.sender_phone}
                            onPress={() => {}}
                        />
                        <InfoOrder
                            title="người nhận"
                            iconColor={'#2299ba'}
                            iconName={'my-location'}
                            address={item.sender_address}
                            name={item.sender_name}
                            phone={item.sender_phone}
                            onPress={() => {}}
                        />
                    </View>

                    <OrderSize
                        size={item.size_item}
                        detail={item.detail_item}
                    />
                    <View style={styles.price}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>
                            Thành tiền:
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>
                            {item.price}đ
                        </Text>
                    </View>
                </ScrollView>
            </View>
            <ButtonConfirm
                footerStyle={styles.footer}
                validate={true}
                onPress={onClickTakeOrder}
                title="Nhận đơn"
            />
        </SafeAreaView>
    );
};

export default OrderInfo;
