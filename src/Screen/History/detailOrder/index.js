import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../../Components/Header';
import { InfoOrder } from '../../../Components/addressOrder';
import { ButtonConfirm } from '../../../Components/ButtonConfirm';
import { StatusLabel } from './components/statusLabel';
import { TimerOrder } from './components/timerOrder';
import { OrderTransport } from '../../../Components/orderTransport';
import { DisplayDistance } from '../../../Components/displayDistance';
import { OrderSize } from '../../../Components/orderSize';

const DetailOrder = ({ route }) => {
    const navigation = useNavigation();
    const item = route?.params.item;
    const orderData = item.orderData;
    const onClickExit = () => {
        navigation.goBack();
    };
    const onClickMap = () => {};
    return (
        <SafeAreaView style={styles.component}>
            <Header onClickReturn={onClickExit} title="Chi tiết đơn hàng" />

            <View style={styles.body}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {item.confirmAt === null ? (
                        <StatusLabel
                            title1={'Đã hủy đơn hàng'}
                            title2={'Đơn hàng đã bị huỷ bởi bạn'}
                            iconName={'book-cancel'}
                        />
                    ) : (
                        <StatusLabel
                            title1={'Đơn hàng đã hoàn thành'}
                            title2={'Cảm ơn bạn đã tin tưởng chúng tôi!'}
                            iconName={'clipboard-check-multiple-outline'}
                        />
                    )}
                    <OrderTransport
                        infoShipping={orderData.infor_shipping}
                        timer={
                            item.confirmAt === null
                                ? item.deleteAt
                                : item.confirmAt
                        }
                        title={
                            item.confirmAt === null
                                ? 'Đã hủy đơn hàng'
                                : 'Đơn hàng đã được giao thành công'
                        }
                    />
                    <DisplayDistance
                        onPress={onClickMap}
                        distance={orderData.distance}
                    />
                    <InfoOrder
                        title="người gửi"
                        iconColor="red"
                        iconName="location-pin"
                        address={orderData.sender_address}
                        name={orderData.sender_name}
                        phone={orderData.sender_phone}
                        onPress={() => {}}
                    />
                    <InfoOrder
                        title="người nhận"
                        iconColor="#2299ba"
                        iconName="my-location"
                        address={orderData.receiver_address}
                        name={orderData.receiver_name}
                        phone={orderData.receiver_phone}
                        onPress={() => {}}
                    />
                    <OrderSize
                        size={orderData.size_item}
                        detail={orderData.detail_item}
                    />
                    <View style={styles.payment}>
                        <Text style={styles.t_payment}>Thanh toán: </Text>
                        <Text style={styles.t_payment}>
                            <Text style={styles.unit}>đ</Text> {orderData.price}
                        </Text>
                    </View>
                    <View style={styles.id_order}>
                        <View style={styles._id_order_item}>
                            <Text style={styles.t_payment}>Mã đơn hàng</Text>
                            <Text style={styles.t_payment}>{orderData.id}</Text>
                        </View>
                        <TimerOrder
                            label={'Thời gian nhận đơn'}
                            timer={item.createdAt}
                        />
                        {item.confirmAt !== null ? (
                            <>
                                <TimerOrder
                                    label={'Thời gian lấy hàng'}
                                    timer={item.takeAt}
                                />
                                <TimerOrder
                                    label={'Thời gian hoàn thành'}
                                    timer={item.confirmAt}
                                />
                            </>
                        ) : (
                            <TimerOrder
                                label={'Thời gian hủy đơn'}
                                timer={item.deleteAt}
                            />
                        )}
                    </View>
                </ScrollView>
            </View>
            <ButtonConfirm
                footerStyle={styles.footer}
                validate={true}
                onPress={onClickExit}
                title={'Xác nhận'}
            />
        </SafeAreaView>
    );
};

export default DetailOrder;
