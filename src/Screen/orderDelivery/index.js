import React, { useState, useContext, useEffect } from 'react';
import { View, SafeAreaView, Text, ScrollView, Linking } from 'react-native';
import { styles } from './styles';
import AppContext from '../../Context';
import axios from 'axios';
import moment from 'moment-timezone';
import { Map } from '../../Components/MapView';
import { Header } from '../../Components/Header';
import { Button } from '../../Components/Button';
import { InfoOrderUser } from '../../Components/infoOrderUser';
import { NameScreen } from '../../Constants/nameScreen';

const OrderDelivery = ({ navigation, route }) => {
    const API_KEY = 'uGwlo6yHxKnoqSPqp0Enla92wOd1YpmpbYrEy3GK';
    const { socket, setStatus, setScreen, setSelectedID, setTake, setDisplay } =
        useContext(AppContext);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [region, setRegion] = useState(null);
    const item = route?.params.item;
    console.log('item: ', item);
    const currentTime = moment()
        .tz('Asia/Bangkok')
        .format('YYYY-MM-DD HH:mm:ss');
    const onclickDel = () => {
        setStatus(false);
        setScreen(0);
        setSelectedID(null);
        navigation.navigate('Đơn hàng');
    };
    const onClickReturn = () => {
        // navigation.navigate('Đơn hàng');
        // setScreen(2);
        navigation.goBack();
    };
    const data = {
        id_Order: item.id,
        confirmAt: currentTime,
        status: 1,
    };

    const openGoogleMaps = () => {
        const destinationAddress = item.receiver_address;
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationAddress}`;

        Linking.openURL(googleMapsUrl)
            .then((result) => {
                if (result) {
                    console.log('Successfully opened Google Maps');
                } else {
                    console.log('Failed to open Google Maps');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const onClickSuccess = async () => {
        if (socket) {
            await axios
                .get('https://delivery-server-s54c.onrender.com/socket', {
                    params: {
                        user_id: item.customer_id,
                        type: 0,
                    },
                })
                .then((res) => {
                    if (res.data.err == 0) {
                        socket.emit('deliverySuccess', {
                            socket_id: res.data.data.socket_id,
                            id: item.id,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        await axios
            .put(
                'https://delivery-server-s54c.onrender.com/order/driver/update',
                data
            )
            .then((res) => {
                console.log(res);
                if (res.data.err == 0) {
                    setTake(false);
                    setDisplay(false);
                    setStatus(false);
                    navigation.navigate('Đơn hàng');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const onClickPhone = async () => {
        const isAvailable = await Linking.canOpenURL(`tel:${item.phone}`);
        if (isAvailable) {
            // Mở ứng dụng gọi điện thoại
            Linking.openURL(`tel:${item.phone}`);
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
                const addresses = item.receiver_address;
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
                            {item.receiver_address}
                        </Text>
                        <Button
                            colorBackground={'#ff6833'}
                            colorTitle={'white'}
                            title={'Đường đi'}
                            onPress={openGoogleMaps}
                        />
                    </View>

                    {item.sender_detail_address !== '' && (
                        <View>
                            <Text style={styles.labelAddress}>
                                Địa chỉ chi tiết
                            </Text>
                            <Text style={{ color: 'silver' }}>
                                {item.receiver_detail_address}
                            </Text>
                        </View>
                    )}
                    <InfoOrderUser
                        label={'người nhận'}
                        name={item.receiver_name}
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
