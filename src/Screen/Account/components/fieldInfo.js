import React from 'react';
import { FontAwesome } from '../../../assets/icon';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextFont } from '../../../Components/Text';
import { EditIcon, PencelIcon } from '../../../assets/Icons';

const styles = StyleSheet.create({
    layoutItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 0.2,
        borderColor: 'silver',
        alignItems: 'center',
    },
    textItem: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
    },
});

const icon = (id) => {
    switch (id) {
        case 1: {
            return <EditIcon height={40} width={40} />;
        }
        case 2: {
            return <PencelIcon height={40} width={40} />;
        }
    }
};

export const FieldInfo = ({ info, label }) => (
    <View style={styles.layoutItem}>
        <Text style={styles.textItem}>{label}</Text>
        <TextFont title={info} fs={16} />
    </View>
);

export const FieldLabel = ({ labelStyle, onPress, label, id }) => (
    <View style={styles.layoutItem}>
        <Text style={labelStyle}>{label}</Text>
        <TouchableOpacity onPress={onPress} style={{ padding: 3 }}>
            {icon(id)}
        </TouchableOpacity>
    </View>
);
