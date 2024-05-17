import { instance } from './instance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, onValue, ref } from 'firebase/database';

export const getData = async (setKey, setAvatar) => {
    const accessToken = await AsyncStorage.getItem('access_token');
    const data = {
        headers: {
            Authorization: accessToken,
        },
    };
    await instance
        .get('/driver', data)
        .then(async (res) => {
            await AsyncStorage.setItem('id', res.data.userData.id.toString());
            await AsyncStorage.setItem('name', res.data.userData.name);
            await AsyncStorage.setItem('dob', res.data.userData.dob);
            await AsyncStorage.setItem(
                'gender',
                JSON.stringify(res.data.userData.gender)
            );
            await AsyncStorage.setItem('phone', res.data.userData.phone);
            await AsyncStorage.setItem(
                'vehicle_num',
                res.data.userData.vehicle_num
            );
            getKey(res.data.userData.id, setKey, setAvatar);
        })
        .catch((err) => {
            console.log(err);
        });
};

const getKey = (id, setKey, setAvatar) => {
    console.log('id: ', id);
    const database = getDatabase();
    const dataRef = ref(database, 'avatar/driver');
    const onDataChange = (snapshot) => {
        const newData = snapshot.val() ?? [];
        const keys = Object.keys(snapshot.val() ?? []);
        const arr = Object.values(newData);
        arr.filter((item, index) => {
            item?.id === id &&
                (setKey(keys[index]),
                console.log(item?.avatar),
                setAvatar(item?.avatar));
        });
    };
    onValue(dataRef, onDataChange);
};

export const updateData = async (data) => {
    try {
        const response = await instance.put('/customer', data);
        const status = response.data.err;
        return status;
    } catch (error) {
        console.log(error);
    }
};

export const updatePassword = async (data) => {
    try {
        const res = await instance.put('/customer/password', data);
        return res.data.err;
    } catch (error) {
        console.log(error);
    }
};
