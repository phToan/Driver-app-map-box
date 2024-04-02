import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { instance } from '../../../Api/instance';
import { ListOrders } from '../../../Components/listOrders';
import { NameScreen } from '../../../Constants/nameScreen';

const CompletedOrder = () => {
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const getOrder = async () => {
        const require = {
            driver_id: await AsyncStorage.getItem('id'),
            status: '1',
        };
        await instance
            .get('/order/driver', {
                params: require,
            })
            .then((res) => {
                setData(res.data.data.rows);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (isFocused) {
            getOrder();
        }
    }, [isFocused]);

    const getItem = (item) => {
        navigation.navigate(NameScreen.ORDER_DETAIL_SCREEN, { item });
    };

    return <ListOrders data={data} onPress={getItem} />;
};

export default CompletedOrder;
