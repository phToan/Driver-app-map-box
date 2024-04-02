import React, { useState, useContext, useEffect } from 'react';
import { View, SafeAreaView, Text, ScrollView, Linking } from 'react-native';
import AppContext from '../../Context';
import { styles } from './styles';
import axios from 'axios';
import moment from 'moment-timezone';
import { Map } from '../../Components/MapView';
import { Header } from '../../Components/Header';
import { Button } from '../../Components/Button';
import { InfoOrderUser } from '../../Components/infoOrderUser';
import { onClickPhone } from '../../Helper/linkPhone';
import { instance } from '../../Api/instance';
import { NameScreen } from '../../Constants/nameScreen';
import LoadingModal from '../../Components/LoadingModal';
import NotificationModal from '../../Components/notificationModal';
import color from '../../assets/color';
// import * as Location from 'expo-location';

const OrderTaken = ({ navigation, route }) => {
    const API_KEY = 'uGwlo6yHxKnoqSPqp0Enla92wOd1YpmpbYrEy3GK';
    const { socket, setStatus, setScreen, setSelectedID, setTake, setDisplay } =
        useContext(AppContext);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [region, setRegion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const onHide = () => {
        setVisible(false);
    };
    const currentTime = moment()
        .tz('Asia/Bangkok')
        .format('YYYY-MM-DD HH:mm:ss');
    const item = route?.params.item;
    const data = {
        id_Order: item.id,
        takeAt: currentTime,
    };
    const onClickReturn = () => {
        navigation.navigate(NameScreen.BOTTOM_TAB);
        setScreen(1);
    };
    const onClickDetail = () => {
        navigation.navigate(NameScreen.WATCH_DETAIL_SCREEN, {
            item,
        });
    };

    const openGoogleMaps = () => {
        navigation.navigate(NameScreen.DIRECTION_MAP_SCREEN);
    };

    const onclickDel = async () => {
        setLoading(true);
        await instance
            .put('/order/customer/update', {
                id: item.id,
                driver_id: 0,
            })
            .then(async (res) => {
                console.log(res.data);
                if (res.data.err == 0) {
                    setStatus(false);
                    setScreen(0);
                    setSelectedID(null);
                    setTake(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        await instance
            .put('/order/driver/update', {
                id_Order: item.id,
                deleteAt: currentTime,
            })
            .then((res) => {
                if (res.data.err == 0) {
                    setLoading(false);
                    setDisplay(false);
                    navigation.navigate(NameScreen.BOTTOM_TAB);
                } else {
                    console.log('failure');
                }
            })
            .catch((err) => {
                console.log('err: ', err);
            });
    };

    const onClickSuccess = async () => {
        navigation.navigate(NameScreen.DELIVERY_SCREEN, { item });
        // setLoading(true);
        // await instance
        //     .put('/driver/update', data)
        //     .then((res) => {
        //         console.log(res);
        //         if (res.data.err == 0) {
        //             setLoading(false);
        //             navigation.navigate(NameScreen.DELIVERY_SCREEN, { item });
        //         } else {
        //             console.log('failure');
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    };

    const getLocationCoordinates = async () => {
        try {
            const addresses = item.sender_address;
            // console.log(addresses)
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

    // const getCurrentLocation = async () => {
    //     Geolocation.getCurrentPosition(
    //         (position) => {
    //             const { latitude, longitude } = position.coords;
    //             console.log('latitude: ', latitude);
    //         }
    //         // (error) => {
    //         //     setErrorMsg(error.message);
    //         // },
    //         // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    //     );
    // };

    useEffect(() => {
        getLocationCoordinates();
        // getCurrentLocation();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NotificationModal
                Message={message}
                Visible={visible}
                onHide={onHide}
            />
            <LoadingModal visible={loading} />
            <Header
                onClickReturn={onClickReturn}
                title={'Thông tin lấy hàng'}
            />

            <View style={styles.body}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles._body_title}>
                        <Text style={styles.labelLocate}>
                            Địa điểm lấy hàng
                        </Text>
                    </View>
                    <View style={styles.map}>
                        <Map lat={latitude} lng={longitude} delta={0.01} />
                    </View>
                    <View style={styles.address}>
                        <Text style={styles.t_address}>
                            {item.sender_address}
                        </Text>
                        <Button
                            colorBackground={'#ff6833'}
                            colorTitle={'white'}
                            title={'Đường đi'}
                            onPress={openGoogleMaps}
                        />
                    </View>
                    {item.sender_detail_address !== '' && (
                        <View style={styles.detailAddressArea}>
                            <Text style={styles.labelLocate}>
                                Địa chỉ chi tiết:{' '}
                            </Text>
                            <View style={styles.detailAddress}>
                                <Text
                                    numberOfLines={4}
                                    ellipsizeMode="tail"
                                    style={{ color: 'black', fontSize: 16 }}
                                >
                                    {item.sender_detail_address}
                                </Text>
                            </View>
                        </View>
                    )}
                    <InfoOrderUser
                        name={item.sender_name}
                        label={'người gửi'}
                    />
                    <View style={{ marginHorizontal: '20%', gap: 10 }}>
                        <Button
                            colorBackground={'green'}
                            colorTitle={'white'}
                            title={'Gọi điện'}
                            onPress={onClickPhone}
                        />
                        <Button
                            colorBackground={'#e60aa4'}
                            colorTitle={'white'}
                            title={'Xem chi tiết đơn hàng'}
                            onPress={onClickDetail}
                        />
                    </View>
                    <View style={styles.bt_detail_order}>
                        <Text style={styles.text}>Thanh toán</Text>
                        <Text style={styles.cast}>{item.price} đ</Text>
                    </View>
                    <View style={styles.payment}>
                        <Text style={styles.text}>Hình thức thanh toán</Text>
                        <Text style={styles.text}>Tiền mặt</Text>
                    </View>
                </ScrollView>
            </View>

            <View style={styles.footer}>
                <Button
                    colorBackground={'silver'}
                    colorTitle={'black'}
                    onPress={onclickDel}
                    title={'Hủy đơn hàng'}
                />
                <Button
                    colorBackground={'darkorange'}
                    colorTitle={'white'}
                    onPress={onClickSuccess}
                    title={'Lấy hàng thành công'}
                />
            </View>
        </SafeAreaView>
    );
};

export default OrderTaken;
