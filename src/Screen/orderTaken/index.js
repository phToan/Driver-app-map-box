import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, Text, ScrollView, Linking } from 'react-native';
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
import Geolocation from '@react-native-community/geolocation';
import { update, getDatabase, ref } from 'firebase/database';
import AppContext from '../../Context';

const OrderTaken = ({ navigation, route }) => {
    const { setIsOrderSelected } = useContext(AppContext);
    const API_KEY = 'uGwlo6yHxKnoqSPqp0Enla92wOd1YpmpbYrEy3GK';
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [region, setRegion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const database = getDatabase();
    const item = route?.params.item;
    const dataRef = ref(database, `order/${item.key}/driver`);
    const onHide = () => {
        setVisible(false);
    };
    const currentTime = moment()
        .tz('Asia/Bangkok')
        .format('YYYY-MM-DD HH:mm:ss');
    const data = {
        id_Order: item.id,
        takeAt: currentTime,
    };
    const onClickReturn = () => {
        navigation.navigate(NameScreen.BOTTOM_TAB);
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
        const updateData = {
            id: 0,
            status: 0,
        };
        update(dataRef, updateData)
            .then(() => {
                setIsOrderSelected(false);
                setLoading(false);
                navigation.goBack();
            })
            .catch((e) => {
                setLoading(false);
                setVisible(true);
                setMessage(
                    'Huỷ đơn hàng thất bại. Vui lòng liên hệ với bộ phận chăm sóc khách hàng hoặc thử lại sau ít phút!'
                );
                console.log('err: ', e);
            });
    };

    const onClickSuccess = async () => {
        setLoading(true);
        const updateData = {
            id: 1,
            status: 2,
        };
        update(dataRef, updateData)
            .then(() => {
                setLoading(false);
                navigation.navigate(NameScreen.DELIVERY_SCREEN, { item });
            })
            .catch((e) => {
                setLoading(false);
                setVisible(true);
                setMessage(
                    'Xác nhận lấy hàng không thành công. Vui lòng liên hệ với bộ phận chăm sóc khách hàng hoặc thử lại sau ít phút!'
                );
                console.log('err: ', e);
            });
    };

    const getLocationCoordinates = async () => {
        try {
            const addresses = item.senderInfo.address;
            // console.log(addresses)
            const response = await axios.get(
                `https://rsapi.goong.io/Geocode?address=${addresses}&api_key=${API_KEY}`
            );

            const data = response.data;
            if (data.status === 'OK' && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                setLatitude(location.lat);
                setLongitude(location.lng);
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

    const getCurrentLocation = async () => {
        try {
            await Geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getLocationCoordinates();
        getCurrentLocation();
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
                            {item.senderInfo.address}
                        </Text>
                        <Button
                            colorBackground={'#ff6833'}
                            colorTitle={'white'}
                            title={'Đường đi'}
                            onPress={openGoogleMaps}
                        />
                    </View>
                    {item.senderInfo.subAddress !== '' && (
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
                                    {item.senderInfo.subAddress}
                                </Text>
                            </View>
                        </View>
                    )}
                    <InfoOrderUser
                        name={item.senderInfo.name}
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
