import { SafeAreaView, Text, View, Switch } from 'react-native';
import React, { useState } from 'react';
import { Header } from '../../Components/Header';

const AutoReceiveOrder = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    const onClickReturn = () => {
        navigation.goBack();
    };
    return (
        <SafeAreaView>
            <Header onClickReturn={onClickReturn} title="Tự động nhận đơn" />
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </SafeAreaView>
    );
};

export default AutoReceiveOrder;
