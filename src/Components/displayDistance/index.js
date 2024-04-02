import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '../../assets/icon';
import { DistanceIcon } from '../../assets/Icons';
import color from '../../assets/color';

export const DisplayDistance = ({ onPress, distance }) => (
    <View style={styles.distance}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <DistanceIcon height={25} width={25} color={color.BlueColor} />
            <Text style={styles.t_distance}>
                Quãng đường:{' '}
                <Text style={{ color: 'blue' }}>{distance} km</Text>
            </Text>
        </View>
        <TouchableOpacity
            style={{ justifyContent: 'center' }}
            activeOpacity={0.8}
            onPress={onPress}
        >
            <Text style={{ color: '#1db874' }}>Xem trên bản đồ</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    distance: {
        backgroundColor: 'white',
        marginTop: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.3,
    },
    t_distance: {
        fontSize: 16,
        fontWeight: '500',
        marginHorizontal: 10,
    },
});
