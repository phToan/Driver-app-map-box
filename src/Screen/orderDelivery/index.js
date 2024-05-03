import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, ScrollView, Linking } from 'react-native';
import { styles } from './styles';
import axios from 'axios';
import moment from 'moment-timezone';
import { Map } from '../../Components/MapView';
import { Header } from '../../Components/Header';
import { Button } from '../../Components/Button';
import { InfoOrderUser } from '../../Components/infoOrderUser';
import { NameScreen } from '../../Constants/nameScreen';

const OrderDelivery = ({ navigation, route }) => {
    const API_KEY = 'uGwlo6yHxKnoqSPqp0Enla92wOd1YpmpbYrEy3GK';
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [region, setRegion] = useState(null);
    const item = route?.params.item;
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
        navigation.navigate(NameScreen.DIRECTION_MAP_SCREEN);
    };

    const onClickSuccess = async () => {};
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
    useEffect(() => {
        const getLocationCoordinates = async () => {
            try {
                const addresses = item.receiverInfo.address;
                const response = await axios.get(
                    `https://rsapi.goong.io/Geocode?address=${addresses}&api_key=${API_KEY}`
                );
                const data = response.data;
                if (data.status === 'OK' && data.results.length > 0) {
                    const location = data.results[0].geometry.location;
                    setLatitude(location.lat);
                    setLongitude(location.lng);
                    console.log(`llll: ${location.lat},${location.lng}`);
                    setRegion({
                        latitude: location.lat,
                        longitude: location.lng,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                    });
                }
            } catch (error) {
                console.log(error.message + 'l');
            }
        };
        getLocationCoordinates();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header onClickReturn={onClickReturn} title="Thông tin giao hàng" />
            <View style={styles.body}>
                <ScrollView>
                    <View style={styles._body_title}>
                        <Text style={{ fontWeight: 'bold' }}>
                            Địa điểm giao hàng
                        </Text>
                    </View>
                    <View style={styles.map}>
                        <Map lat={latitude} lng={longitude} delta={0.001} />
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
                            title={'Gọi điện'}
                            onPress={onClickPhone}
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
                    colorBackground={'darkorange'}
                    colorTitle={'white'}
                    title={'Giao hàng thành công'}
                    onPress={onClickSuccess}
                />
            </View>
        </SafeAreaView>
    );
};
export default OrderDelivery;
