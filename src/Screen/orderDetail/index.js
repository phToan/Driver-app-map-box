import React from 'react';
import { View, SafeAreaView, Text, ScrollView, Linking } from 'react-native';
import { styles } from './styles';
import { Header } from '../../Components/Header';
import { OrderTransport } from '../../Components/orderTransport';
import { InfoOrder } from '../../Components/addressOrder';
import { DisplayDistance } from '../../Components/displayDistance';
import { OrderSize } from '../../Components/orderSize';
import { TextFont } from '../../Components/Text';

const WatchDetailScreen = ({ route, navigation }) => {
    const item = route.params?.item;
    const onClickReturn = () => {
        navigation.goBack();
    };

    const openGoogleMaps = () => {
        const sourceAddress = item.sender_address;
        const destinationAddress = item.receiver_address;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${sourceAddress}&destination=${destinationAddress}`;
        Linking.openURL(url);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                            address={item?.senderInfo?.address}
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
                    {item.COD && (
                        <View style={styles.cod}>
                            <TextFont
                                title={'Thu hộ (COD):'}
                                fs={16}
                                fw={'500'}
                            />
                            <TextFont
                                title={`${item.COD}đ`}
                                fs={16}
                                fw={'500'}
                            />
                        </View>
                    )}
                    {item.transportFee && (
                        <View
                            style={[
                                styles.fee,
                                {
                                    marginTop: item.COD ? 0 : 40,
                                },
                            ]}
                        >
                            <TextFont
                                title={'Phí vận chuyển:'}
                                fs={16}
                                fw={'500'}
                            />
                            <TextFont
                                title={`${item.transportFee}đ`}
                                fs={16}
                                fw={'500'}
                            />
                        </View>
                    )}
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
        </SafeAreaView>
    );
};

export default WatchDetailScreen;
