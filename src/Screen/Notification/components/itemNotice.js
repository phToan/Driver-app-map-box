import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { PromotionIcon, AnnounceIcon } from '../../../assets/Icons';
import color from '../../../assets/color';

const Icon = (id) => {
    switch (id) {
        case 1: {
            return (
                <View style={styles._item_icon}>
                    <PromotionIcon
                        height={25}
                        width={25}
                        style={{ color: color.GoodStatusGreen }}
                    />
                </View>
            );
        }
        case 2: {
            return (
                <View
                    style={{
                        marginHorizontal: 15,
                        justifyContent: 'center',
                    }}
                >
                    <AnnounceIcon
                        height={40}
                        width={40}
                        style={{ color: 'red' }}
                    />
                </View>
            );
        }
    }
};

export const ItemNotice = ({ onPress, id, label, color }) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
        {Icon(id)}
        <View>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.title}>dateTime</Text>
        </View>
    </TouchableOpacity>
);
const styles = StyleSheet.create({
    _item_icon: {
        borderRadius: 100,
        backgroundColor: color.BackgroundGreen,
        padding: 11,
        marginHorizontal: 15,
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: 'black',
        elevation: 4,
    },
    item: {
        paddingVertical: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginBottom: 5,
    },
    label: {
        fontWeight: '500',
        fontSize: 16,
    },
    title: {
        marginTop: 5,
    },
});
