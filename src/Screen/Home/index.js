import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { styles } from './styles';
import AppContext from '../../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlankDataImage } from '../../assets/images';
import { instance } from '../../Api/instance';
import { OrderItem } from './components/orderItem';
import color from '../../assets/color';
import HeaderBottomTab from '../../Components/HeaderBottomTab';
import { NameScreen } from '../../Constants/nameScreen';

const Home = ({ navigation }) => {
    const { lightDot, screen } = useContext(AppContext);
    const [data, setData] = useState([]);
    const [order, setOrder] = useState({});
    const [id, setID] = useState('');
    const [fetch, setFetch] = useState(false);

    const fetchData = async () => {
        try {
            const response = await instance.get('/order/customer', {
                params: payload,
            });
            if (response.data.err == 0) {
                setData(response.data.data.rows);
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (lightDot) {
            setFetch(true);
        }
    }, [lightDot]);
    useEffect(() => {
        if (fetch) {
            fetchData();
            setFetch(false);
        }
    }, [fetch]);

    const payload = {
        status: 1,
        driver_id: 0,
    };

    useEffect(() => {
        const getData = async () => {
            setID(await AsyncStorage.getItem('id'));
        };
        getData();
    }, []);

    // useEffect(() => {
    //     const getData = async () => {
    //         await instance
    //             .get('/order/customer', {
    //                 params: {
    //                     status: 1,
    //                     driver_id: id,
    //                 },
    //             })
    //             .then((res) => {
    //                 fetchData();
    //                 console.log(res.data.data.rows);
    //                 if (res.data.err == 0) {
    //                     setOrder(res.data.data.rows[0]);
    //                     setDisplay(true);
    //                 } else {
    //                     console.log('failure');
    //                 }
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     };
    //     if (isTake) {
    //         getData();
    //     }
    // }, []);

    const getItem = (item) => {
        navigation.navigate(NameScreen.ORDER_INFO_SCREEN, { item });
    };

    const selectOrder = (item) => {
        if (screen == 1) {
            navigation.navigate(NameScreen.TAKE_ORDER_SCREEN, { item });
        } else {
            navigation.navigate(NameScreen.DELIVERY_SCREEN, { item });
        }
    };

    const ListEmptyComponent = () => (
        <View style={styles.componentBlank}>
            <ActivityIndicator size={'large'} color={color.orange} />
            <Text style={styles.titleBlank}>Đang tìm kiếm đơn hàng</Text>
        </View>
    );

    return (
        <View
            style={[
                styles.component,
                {
                    backgroundColor: lightDot ? color.base : '#f7f8fa',
                },
            ]}
        >
            <HeaderBottomTab />

            {lightDot ? (
                <FlatList
                    style={{ flex: 1, padding: 10 }}
                    data={data}
                    renderItem={({ item }) => (
                        <OrderItem item={item} onPress={() => getItem(item)} />
                    )}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={ListEmptyComponent}
                    initialNumToRender={5}
                    maxToRenderPerBatch={5}
                />
            ) : (
                <View style={styles._not_list}>
                    <Image source={BlankDataImage} style={styles.Image} />
                    <Text style={styles.titleOffline}>Không có đơn hàng</Text>
                    <Text>Hãy chuyển sang chế độ Trực tuyến để nhận đơn</Text>
                </View>
            )}
        </View>
    );
};

export default Home;
