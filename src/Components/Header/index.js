import React, { memo } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '../../assets/icon';
import { styles } from './styles';
import { ArrowLeftIcon } from '../../assets/Icons';
import color from '../../assets/color';

export const Header = memo(({ onClickReturn, title }) => {
    return (
        <View style={styles.body}>
            <TouchableOpacity style={styles.icon} onPress={onClickReturn}>
                <ArrowLeftIcon
                    width={30}
                    height={30}
                    style={{ color: 'black' }}
                />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.icon} />
        </View>
    );
});

// export default memo(Header)
