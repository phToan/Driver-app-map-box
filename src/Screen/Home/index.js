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
import { initOrder } from '../../Api/firebase';
import NotificationModal from '../../Components/notificationModal';
import {
    getDatabase,
    onValue,
    off,
    ref,
    onChildAdded,
    onChildRemoved,
} from 'firebase/database';
import { useIsFocused } from '@react-navigation/native';

const Home = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const {
        lightDot,
        setIsOrderSelected,
        setFocusScreen,
        keySelected,
        setVisiblePopup,
        setKeySelected,
    } = useContext(AppContext);
    const [data, setData] = useState([]);
    const [order, setOrder] = useState({});
    const [id, setID] = useState('');
    const [fetch, setFetch] = useState(false);
    const [orderSelected, setOrderSelected] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setFocusScreen('HomeScreen');
        }
    }, [isFocused]);

    useEffect(() => {
        if (lightDot) {
            const database = getDatabase();
            const dataRef = ref(database, 'order');
            const onDataChange = (snapshot) => {
                setOrderSelected([]);
                const newData = snapshot.val() ?? [];
                const arr = Object.values(newData);
                const arrItem = arr.filter(
                    (item) => item?.driver?.id === 0 || item?.driver?.id === 1
                );
                let arrData = [];
                const keys = Object.keys(snapshot.val() ?? []);
                arrItem.map((e, index) => {
                    e.key = keys[index];
                    arrData.unshift(e);
                    e.driver.status > 0 &&
                        e.driver.id === 1 &&
                        (setOrderSelected((prev) => [...prev, e]),
                        setIsOrderSelected(true),
                        console.log('e.key: ', e.key),
                        setKeySelected(e.key),
                        (arrData = arrData.filter((item) => item.id !== e.id)));
                });
                setData(arrData);
            };
            const unsubscribe = onValue(dataRef, onDataChange);

            // Lắng nghe sự kiện khi một trường được xóa đi
            const onRemoved = onChildRemoved(dataRef, (snapshot) => {
                const removedFieldId = snapshot.key;
                if (keySelected === removedFieldId) {
                    setVisiblePopup(true);
                    setIsOrderSelected(false);
                    console.log('abc');
                }
            });
            return () => {
                off(dataRef, onDataChange);
                unsubscribe();
                onRemoved();
            };
        }
    }, [lightDot]);
    console.log(keySelected);
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
    // useEffect(() => {
    //     if (lightDot) {
    //         setFetch(true);
    //     }
    // }, [lightDot]);
    // useEffect(() => {
    //     if (fetch) {
    //         fetchData();
    //         setFetch(false);
    //     }
    // }, [fetch]);

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
        if (item.driver.id === 0) {
            navigation.navigate(NameScreen.ORDER_INFO_SCREEN, { item });
            return;
        }
        if (item.driver.id === 1) {
            if (item.driver.status === 1) {
                navigation.navigate(NameScreen.TAKE_ORDER_SCREEN, { item });
            } else {
                navigation.navigate(NameScreen.DELIVERY_SCREEN, { item });
            }
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
            <HeaderBottomTab setMessage={setMessage} setVisible={setVisible} />
            <NotificationModal
                Message={message}
                Visible={visible}
                onHide={() => setVisible(false)}
            />
            {lightDot ? (
                <>
                    {orderSelected.length > 0 && (
                        <View style={styles.itemSelected}>
                            <OrderItem
                                item={orderSelected[0]}
                                onPress={() => getItem(orderSelected[0])}
                                style={{
                                    backgroundColor: color.BackgroundGreen,
                                }}
                                lineStyle={{
                                    top: '16%',
                                }}
                            />
                        </View>
                    )}
                    <FlatList
                        style={{ flex: 1, padding: 10 }}
                        data={data}
                        renderItem={({ item }) => (
                            <OrderItem
                                item={item}
                                onPress={() => getItem(item)}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={ListEmptyComponent}
                        initialNumToRender={5}
                        maxToRenderPerBatch={5}
                    />
                </>
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
