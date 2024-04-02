import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '../../assets/icon';
import { DetailIcon } from '../../assets/Icons';

export const OrderSize = ({ size, detail }) => (
    <View style={styles.order}>
        <View style={styles.labelOrder}>
            <DetailIcon height={30} width={30} color="green" />
            <Text style={styles.t_order}>Chi tiết đơn hàng</Text>
        </View>
        <View style={{ marginTop: 5 }}>
            <Text>Kích thước đơn: {size == 1 ? 'cồng kềnh' : 'nhỏ gọn'}</Text>
            {detail !== '' && (
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={{ color: '#3c3c38', marginTop: 5 }}>
                        Thông tin đơn:
                    </Text>
                    <View style={styles.info}>
                        <Text numberOfLines={4}>{detail}</Text>
                    </View>
                </View>
            )}
        </View>
    </View>
);

const styles = StyleSheet.create({
    info: {
        height: 100,
        width: '74.5%',
        borderWidth: 0.5,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 5,
        padding: 10,
        borderColor: 'green',
    },
    order: {
        backgroundColor: 'white',
        marginTop: 20,
    },
    labelOrder: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    t_order: {
        fontWeight: '500',
        fontSize: 16,
        marginLeft: 10,
    },
});
