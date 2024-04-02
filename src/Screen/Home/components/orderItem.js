import React, { memo } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { RocketIcon, FlashIcon } from '../../../assets/images';
import { MaterialIcons } from '../../../assets/icon';
import color from '../../../assets/color';
import { DotCircleIcon } from '../../../assets/Icons';

export const OrderItem = memo(({ item, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.body}
            onPress={() => onPress(item)}
            activeOpacity={0.9}
        >
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: 20,
                }}
            >
                <DotCircleIcon
                    height={20}
                    width={20}
                    style={{ color: 'green' }}
                />
                <Text style={{ marginLeft: 10, fontSize: 15 }}>
                    {item.sender_address}
                </Text>
            </View>
            <View style={styles.line} />
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: 20,
                    marginTop: 21,
                }}
            >
                <DotCircleIcon
                    height={20}
                    width={20}
                    style={{ color: 'red' }}
                />
                <Text style={{ marginLeft: 10, fontSize: 15 }}>
                    {item.receiver_address}
                </Text>
            </View>

            <View style={styles.under}>
                <View style={{ flex: 1, marginLeft: 20 }}>
                    {item.infor_shipping ? (
                        <Image source={RocketIcon} style={styles.image} />
                    ) : (
                        <Image source={FlashIcon} style={styles.image} />
                    )}
                </View>
                <View style={{ flex: 5 }}>
                    <Text style={styles.t_shipping}>
                        {item.infor_shipping ? 'Hỏa Tốc' : 'Tiết kiệm'}
                    </Text>
                    <Text style={styles.t_money}>
                        <Text style={styles.t_initmoney}>đ</Text> {item.price} -
                        <Text style={{ color: 'blue' }}>
                            - {item.distance} km
                        </Text>
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    image: {
        height: 50,
        width: 50,
    },
    t_shipping: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    t_money: {
        color: 'red',
        marginTop: 5,
    },
    under: {
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderColor: '#bec0c2',
        marginTop: 10,
        paddingTop: 10,
    },
    body: {
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 15,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: 'black',
        elevation: 4,
    },
    t_initmoney: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: 16,
    },
    line: {
        borderLeftWidth: 1,
        height: 30,
        position: 'absolute',
        top: '22%',
        left: '10.1%',
        borderColor: '#bec0c2',
    },
});
