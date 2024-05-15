import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, Text, ScrollView, Linking } from 'react-native';
import { styles } from './styles';
import axios from 'axios';
import moment from 'moment-timezone';
import { Map } from '../../Components/MapView';
import { Header } from '../../Components/Header';
import { Button } from '../../Components/Button';
import { InfoOrderUser } from '../../Components/infoOrderUser';
import { NameScreen } from '../../Constants/nameScreen';
import { PhoneCallIcon, PhoneIcon } from '../../assets/Icons';
import color from '../../assets/color';
import LoadingModal from '../../Components/LoadingModal';
import NotificationModal from '../../Components/notificationModal';
import { update, getDatabase, ref } from 'firebase/database';
import { instance } from '../../Api/instance';
import AppContext from '../../Context';

const OrderDelivery = ({ navigation, route }) => {
    const { setIsOrderSelected } = useContext(AppContext);
    const item = route?.params.item;
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const database = getDatabase();
    const dataRef = ref(database, `order/${item.key}/driver`);
    console.log('item: ', item);
    const currentTime = moment()
        .tz('Asia/Bangkok')
        .format('YYYY-MM-DD HH:mm:ss');
    const onclickDel = () => {
        navigation.navigate('Đơn hàng');
    };
    const onClickReturn = () => {
        navigation.navigate(NameScreen.BOTTOM_TAB);
    };
    const data = {
        id_Order: item.id,
        confirmAt: currentTime,
        status: 1,
    };

    const openGoogleMaps = () => {
        navigation.navigate(NameScreen.DIRECTION_MAP_SCREEN, {
            longDestination: item?.receiverInfo?.long,
            latDestination: item?.receiverInfo?.lat,
        });
    };

    const onClickSuccess = async () => {
        setLoading(true);
        const updateData = {
            id: 1,
            status: 3,
            onSuccess: currentTime,
        };
        update(dataRef, updateData)
            .then(() => {
                saveDB();
                //
                // navigation.navigate(NameScreen.BOTTOM_TAB);
            })
            .catch((e) => {
                setLoading(false);
                setVisible(true);
                setMessage(
                    'Xác nhận giao hàng không thành công. Vui lòng liên hệ với bộ phận chăm sóc khách hàng hoặc thử lại sau ít phút!'
                );
                console.log('err: ', e);
            });
    };

    const payload = {
        id_Order: item?.id,
        driver_id: item?.driver?.id,
        status: 1,
        takeAt: item?.driver?.onTaken,
        confirmAt: item?.driver?.onSuccess,
    };

    const saveDB = async () => {
        await instance
            .post('/order/driver', payload)
            .then((res) => {
                console.log(res);
                setLoading(false);
                setIsOrderSelected(false);
                navigation.navigate(NameScreen.BOTTOM_TAB);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };
    const onClickPhone = async () => {
        const isAvailable = await Linking.canOpenURL(
            `tel:${item.receiverInfo.phone}`
        );
        if (isAvailable) {
            // Mở ứng dụng gọi điện thoại
            Linking.openURL(`tel:${item.receiverInfo.phone}`);
        } else {
            console.log(
                'Ứng dụng gọi điện thoại không khả dụng trên thiết bị.'
            );
        }
    };
    const onClickDetail = () => {
        navigation.navigate(NameScreen.WATCH_DETAIL_SCREEN, { item });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LoadingModal visible={loading} />
            <NotificationModal
                Message={message}
                Visible={visible}
                onHide={() => setVisible(false)}
            />
            <Header onClickReturn={onClickReturn} title="Thông tin giao hàng" />
            <View style={styles.body}>
                <ScrollView>
                    <View style={styles._body_title}>
                        <Text style={{ fontWeight: 'bold' }}>
                            Địa điểm giao hàng
                        </Text>
                    </View>
                    <View style={styles.map}>
                        <Map
                            lat={item?.receiverInfo?.lat}
                            lng={item?.receiverInfo?.long}
                            delta={0.001}
                        />
                    </View>
                    <View style={styles.address}>
                        <Text style={styles.t_address}>
                            {item.receiverInfo.address}
                        </Text>
                        <Button
                            colorBackground={'#ff6833'}
                            colorTitle={'white'}
                            title={'Đường đi'}
                            onPress={openGoogleMaps}
                        />
                    </View>

                    {item.receiverInfo.subAddress !== '' && (
                        <View>
                            <Text style={styles.labelAddress}>
                                Địa chỉ chi tiết
                            </Text>
                            <Text style={{ color: 'silver' }}>
                                {item.receiverInfo.subAddress}
                            </Text>
                        </View>
                    )}
                    <InfoOrderUser
                        label={'người nhận'}
                        name={item.receiverInfo.name}
                    />
                    <View style={styles.button}>
                        <Button
                            colorBackground={'green'}
                            colorTitle={'white'}
                            title={item.receiverInfo.phone}
                            onPress={onClickPhone}
                            icon={() => (
                                <PhoneIcon
                                    height={30}
                                    width={30}
                                    color={color.white}
                                />
                            )}
                        />
                        <Button
                            colorBackground={'#ec09a8'}
                            colorTitle={'white'}
                            title={'Xem chi tiết đơn hàng'}
                            onPress={onClickDetail}
                        />
                    </View>

                    <View style={styles.payment}>
                        <Text style={styles.t_payment}>Thanh toán</Text>
                        <Text style={styles.cast}>{item.price} đ</Text>
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.t_payment}>
                            Hình thức thanh toán
                        </Text>
                        <Text style={styles.cast}>Tiền mặt</Text>
                    </View>
                </ScrollView>
            </View>

            <View style={styles.footer}>
                <Button
                    colorBackground={'silver'}
                    colorTitle={'black'}
                    title={'Thất bại'}
                    onPress={onclickDel}
                />
                <Button
                    colorBackground={color.orange}
                    colorTitle={'white'}
                    title={'Giao hàng thành công'}
                    onPress={onClickSuccess}
                />
            </View>
        </SafeAreaView>
    );
};
export default OrderDelivery;
