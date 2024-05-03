import Icon from 'react-native-vector-icons/Entypo';
import AppContext from '../../Context';
import React, { memo, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DotIcon, RightICon } from '../../assets/Icons';

const HeaderBottomTab = memo(({ setMessage, setVisible }) => {
    const { lightDot, toggleLightDot, isOrderSelected } =
        useContext(AppContext);
    const handleLightDot = () => {
        if (isOrderSelected) {
            setVisible(true);
            setMessage(
                'Bạn đang có đơn hàng chưa hoàn thành. Vui lòng hoàn thành đơn hàng hiện tại và thay đổi trạng thái hoạt động!'
            );
            return;
        }
        toggleLightDot();
    };
    return (
        <View
            style={{
                height: 110,
                backgroundColor: lightDot ? '#fff1d6' : '#c2bdbd',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
            }}
        >
            <TouchableOpacity
                style={{
                    backgroundColor: lightDot ? '#f47c2a' : '#4d4d85',
                    flexDirection: 'row',
                    borderRadius: 30,
                    alignItems: 'center',
                    width: '40%',
                    margin: 10,
                    paddingVertical: 12,
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                }}
                onPress={handleLightDot}
            >
                <DotIcon
                    height={20}
                    width={20}
                    style={{ color: lightDot ? 'green' : 'red' }}
                />
                <Text
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                >
                    {' '}
                    {lightDot ? 'Trực tuyến' : 'Ngoại tuyến'}
                </Text>
                <RightICon height={20} width={20} style={{ color: 'white' }} />
            </TouchableOpacity>
        </View>
    );
});

export default HeaderBottomTab;
