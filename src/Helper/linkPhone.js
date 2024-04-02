import { Linking } from 'react-native';

export const onClickPhone = async (phone) => {
    const isAvailable = await Linking.canOpenURL(`tel:${phone}`);
    if (isAvailable) {
        Linking.openURL(`tel:${phone}`);
    } else {
        console.log('Ứng dụng gọi điện thoại không khả dụng trên thiết bị.');
    }
};
