import React, { useEffect, useState, useContext } from 'react';
import { View, SafeAreaView, Text, ScrollView, Linking } from 'react-native';
// import SysModal from '../../sysModal/sys_modal';
import NotificationModal from '../../Components/notificationModal';
import { styles } from './styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from '../../Components/Header';
import { OrderTransport } from '../../Components/orderTransport';
import { InfoOrder } from '../../Components/addressOrder';
import { DisplayDistance } from '../../Components/displayDistance';
import { OrderSize } from '../../Components/orderSize';
import { ButtonConfirm } from '../../Components/ButtonConfirm';
import { NameScreen } from '../../Constants/nameScreen';
import { instance } from '../../Api/instance';
import LoadingModal from '../../Components/LoadingModal';
import { getDatabase, ref, update } from 'firebase/database';
import AppContext from '../../Context';

const OrderInfo = ({ route, navigation }) => {
    const { isOrderSelected } = useContext(AppContext);
    const item = route.params?.item;
    const visibleButton = route.param;
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

    const onClickTakeOrder = async () => {
        if (isOrderSelected) {
            setShowModal(true);
            setErrorMessage(
                'Bạn đang có đơn hàng chưa hoàn thành. Vui lòng hoàn thành đơn hàng hiện tại để nhận đơn hàng khác!'
            );
            return;
        }
        setLoading(true);
        const database = getDatabase();
        const dataRef = ref(database, `order/${item.key}/driver`);
        const updateData = {
            id: 1,
            status: 1,
        };
        update(dataRef, updateData)
            .then(() => {
                setLoading(false);
                navigation.navigate(NameScreen.TAKE_ORDER_SCREEN, {
                    item,
                });
            })
            .catch((e) => {
                setLoading(false);
                setShowModal(true);
                setErrorMessage(
                    'Nhận đơn hàng thất bại. Vui lòng liên hệ với bộ phận chăm sóc khách hàng hoặc thử lại sau ít phút!'
                );
                console.log('err: ', e);
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
                            address={item.senderInfo.address}
                            name={item.senderInfo.name}
                            phone={item.senderInfo.phone}
                            onPress={() => {}}
                        />
                        <InfoOrder
                            title="người nhận"
                            iconColor={'#2299ba'}
                            iconName={'my-location'}
                            address={item.receiverInfo.address}
                            name={item.receiverInfo.name}
                            phone={item.receiverInfo.phone}
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
